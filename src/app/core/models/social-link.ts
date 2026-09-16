export interface SocialLink {
  id: string;
  type: string;
  label: string;
  url: string | null;
  public: boolean;
  source: string;
  reviewStatus: string;
}
