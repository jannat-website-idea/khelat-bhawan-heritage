import { defineConfig, createMockAuthStore } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { createClient } from '@sanity/client';
import { schemaTypes } from './schemas';
import { deskStructure } from './deskStructure';

const SANITY_WRITE_TOKEN = 'skerYXQ5piYLH0KgBgzaQLS5jflTdxfzDmDxzp3vobEo78cEgDGQMD3ubgfrfiXVgxjSyfQPxToOsQmBm';

const authenticatedClient = createClient({
  projectId: 'ncesiy4k',
  dataset: 'production',
  apiVersion: '2024-03-01',
  token: SANITY_WRITE_TOKEN,
  useCdn: false,
});

const directAdminAuthStore = createMockAuthStore({
  client: authenticatedClient,
  currentUser: {
    id: 'samar-singha',
    name: 'Samar Singha',
    email: 'domainname.03@gmail.com',
    profileImage: null,
    roles: [
      {
        name: 'administrator',
        title: 'Administrator'
      }
    ]
  }
});

export default defineConfig({
  name: 'default',
  title: 'Khelat Bhawan Palace Dashboard',
  basePath: '/studio',

  projectId: 'ncesiy4k',
  dataset: 'production',

  auth: directAdminAuthStore,

  unstable_clientFactory: (options) => {
    return createClient({
      ...options,
      token: SANITY_WRITE_TOKEN,
      useCdn: false
    });
  },

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
