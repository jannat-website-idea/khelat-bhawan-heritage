import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';
import { deskStructure } from './deskStructure';
import StudioLayout from './components/StudioLayout';

export default defineConfig({
  name: 'default',
  title: 'Khelat Bhawan Palace Dashboard',
  basePath: '/studio',

  projectId: '4w2m42ab',
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

  studio: {
    components: {
      layout: StudioLayout,
    },
  },
});
