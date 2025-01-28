export interface SiteDataProps {
  name: string;
  title: string;
  description: string;
  url: string;
}

const siteData: SiteDataProps = {
  name: "Strato Stack 2",
  // Your website's title and description (meta fields)
  title: "Strato Stack 2",
  description:
    "Strato Stack 2 is a modern web development stack for building fast, scalable apps. It implements React Router, Shadcn UI, Tailwind CSS, Drizzle ORM, PostgreSQL, and Better Auth.",
  url: "https://strato.eugenescheepers.com",
};

export default siteData;
