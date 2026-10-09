import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { deskStructure } from './deskStructure';

export default defineConfig({
  name: 'default',
  title: 'Khelat Bhawan Palace Dashboard',
  basePath: '/studio',

  projectId: 'ncesiy4k',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: deskStructure
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
});
