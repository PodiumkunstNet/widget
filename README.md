# Podiumkunst.net widget

Podiumkunst.net widget is a tool designed for websites to display detailed information about works and people in the performing arts. Leveraging Linked Open Data, it provides a rich dataset encompassing various aspects of culture such as operas, theaters, composers, and more.

## Getting Started

These instructions will get your copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software and how to install them.

- Node.js (v18 or more)
- pnpm

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

1. Clone the repository:
   git clone `https://github.com/PodiumkunstNet/widget`
2. Navigate to the project directory:  
   cd widget
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

