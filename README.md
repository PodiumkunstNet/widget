# Podiumkunstnet widget

Podiumkunstnet widget is a tool designed for websites to display detailed information about cultural works and figures. Leveraging LOD (Linked Open Data), it provides a rich dataset encompassing various aspects of culture such as operas, theaters, composers, and more.

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software and how to install them.

- Node.js (v18 or more)
- pnpm

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

1. Clone the repository:
   git clone `https://github.com/lifelynl/podiumkunstnet`
2. Navigate to the project directory:  
   cd podiumkinstnet
3. Install dependencies:
   pnpm install
4. Start the development server:
   pnpm dev

Now the project should be running on `http://localhost:3000`.

### Main Pages

1. Configuration Page - `http://localhost:3000/configure`
   Configure a widget here by entering an ID for a work.

2. Widget Page - `http://localhost:3000/widget`
   This is the actual widget that can be embedded into websites via an iframe. Access the widget with URL parameters to view information about a specific cultural work or figure. For example, use `http://localhost:3000/widget?id=http://example.com/pknet/testWorkZF&type=work` to access information about a particular work.

### Building for Production

To create a production build, run:
pnpm build

This will generate all build files in the public folder.

### Releases

Push a tag with a v\* prefix (e.g., v1.0.0) to trigger a GitHub release. The release is a downloadable archive of the public folder.

### Continuous Deployment

We use Vercel for continuous deployment. The main test environment is automatically updated with merges into the main branch.

Base link: `https://podiumkunstnet-git-main-lifely.vercel.app` (Specific URLs and parameters required)
Deployment history: `https://vercel.com/lifely/podiumkunstnet/deployments`

### Versioning

We use SemVer for versioning. For the versions available, see the tags on this repository:
`https://github.com/lifelynl/podiumkunstnet/releases`
