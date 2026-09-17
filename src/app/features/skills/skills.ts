import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { SkillGroup } from '../../core/models/skill-group';
import { SkillRepository } from '../../core/repositories/skill-repository';
import { Container } from '../../shared/ui/container/container';
import { Heading } from '../../shared/ui/heading/heading';
import { Section } from '../../shared/ui/section/section';
import { Tag } from '../../shared/ui/tag/tag';

type SkillCategory = 'engineering' | 'leadership' | 'delivery' | 'ai';

// The four dimensions requested by the Skills page task. Grouping is a
// presentational reorganization of skills.json's existing groups/items —
// no technology is added or removed, only regrouped for clearer scanning.
const CATEGORY_ORDER: SkillCategory[] = ['engineering', 'leadership', 'delivery', 'ai'];

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  engineering: 'Engenharia',
  leadership: 'Liderança',
  delivery: 'Entrega',
  ai: 'IA aplicada ao desenvolvimento',
};

const GROUP_CATEGORY: Record<string, SkillCategory> = {
  development: 'engineering',
  frontend: 'engineering',
  databases: 'engineering',
  'agile-leadership': 'leadership',
  'quality-bi-automation': 'delivery',
  'business-analysis': 'delivery',
  'cloud-devops': 'delivery',
};

// Copilot is the one item in "Cloud e DevOps" that represents AI-assisted
// development rather than delivery infrastructure (see ADR-010: AI is a
// current learning focus, not a claimed area of production expertise).
const AI_ITEMS = new Set(['Copilot']);

interface SkillGroupView {
  id: string;
  name: string;
  items: string[];
}

interface SkillCategoryView {
  id: SkillCategory;
  label: string;
  groups: SkillGroupView[];
}

@Component({
  selector: 'app-skills',
  imports: [Section, Container, Heading, Tag],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  private readonly skillRepository = inject(SkillRepository);

  private readonly groups = toSignal(this.skillRepository.getSkills(), {
    initialValue: [] as SkillGroup[],
  });

  protected readonly categories = computed<SkillCategoryView[]>(() => {
    const buckets = new Map<SkillCategory, SkillGroupView[]>(
      CATEGORY_ORDER.map((category) => [category, []]),
    );

    for (const group of this.groups()) {
      const name = group.name['pt-BR'] ?? group.name.en ?? group.id;

      if (group.id === 'cloud-devops') {
        const aiItems = group.items.filter((item) => AI_ITEMS.has(item));
        const deliveryItems = group.items.filter((item) => !AI_ITEMS.has(item));

        if (deliveryItems.length > 0) {
          buckets.get('delivery')?.push({ id: group.id, name, items: deliveryItems });
        }
        if (aiItems.length > 0) {
          buckets.get('ai')?.push({ id: `${group.id}-ai`, name, items: aiItems });
        }
        continue;
      }

      const category = GROUP_CATEGORY[group.id] ?? 'engineering';
      buckets.get(category)?.push({ id: group.id, name, items: group.items });
    }

    return CATEGORY_ORDER.filter((category) => (buckets.get(category)?.length ?? 0) > 0).map(
      (category) => ({
        id: category,
        label: CATEGORY_LABELS[category],
        groups: buckets.get(category) ?? [],
      }),
    );
  });
}
