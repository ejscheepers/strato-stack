export interface SiteDataProps {
  name: string;
  title: string;
  description: string;
  url: string;
}

const siteData: SiteDataProps = {
  name: "Strato Stack",
  // Your website's title and description (meta fields)
  title: "Strato Stack",
  description:
    "Strato Stack is a modern web development stack for building fast, scalable apps. It implements React Router, Shadcn UI, Tailwind CSS, Drizzle ORM, PostgreSQL, and Better Auth.",
  url: "https://strato.eugenescheepers.com",
};

export default siteData;
