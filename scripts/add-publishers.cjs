// Add ~70 new publishers + 3 new categories for opensourcestack
const fs = require('fs');
const path = require('path');

const pubFile = path.join(__dirname, '..', 'data', 'publishers.json');
const catFile = path.join(__dirname, '..', 'data', 'categories.json');

const publishers = JSON.parse(fs.readFileSync(pubFile, 'utf8'));
const categories = JSON.parse(fs.readFileSync(catFile, 'utf8'));

const NEW_PUBS = [
  // databases
  { slug: 'baserow', name: 'Baserow', websiteUrl: 'https://baserow.io', githubHandle: 'bram2w', isVerified: true },
  { slug: 'pocketbase', name: 'PocketBase', websiteUrl: 'https://pocketbase.io', githubHandle: 'pocketbase', isVerified: true },
  { slug: 'parseplatform', name: 'Parse Platform', websiteUrl: 'https://parseplatform.org', githubHandle: 'parse-community', isVerified: true },
  { slug: 'budibase', name: 'Budibase', websiteUrl: 'https://budibase.com', githubHandle: 'Budibase', isVerified: true },
  { slug: 'appsmith', name: 'Appsmith', websiteUrl: 'https://www.appsmith.com', githubHandle: 'appsmithorg', isVerified: true },
  // analytics
  { slug: 'posthog', name: 'PostHog', websiteUrl: 'https://posthog.com', githubHandle: 'PostHog', isVerified: true },
  { slug: 'umami', name: 'Umami', websiteUrl: 'https://umami.is', githubHandle: 'umami-software', isVerified: true },
  { slug: 'ackee', name: 'Ackee', websiteUrl: 'https://ackee.electerious.com', githubHandle: 'electerious', isVerified: true },
  { slug: 'goaccess', name: 'GoAccess', websiteUrl: 'https://goaccess.io', githubHandle: 'allinurl', isVerified: true },
  { slug: 'fathom', name: 'Fathom Lite', websiteUrl: 'https://github.com/usefathom/fathom', githubHandle: 'usefathom', isVerified: true },
  { slug: 'owa', name: 'Open Web Analytics', websiteUrl: 'https://www.openwebanalytics.com', githubHandle: 'openwebanalytics', isVerified: true },
  // crm
  { slug: 'twenty', name: 'Twenty', websiteUrl: 'https://twenty.com', githubHandle: 'twentyhq', isVerified: true },
  { slug: 'espocrm', name: 'EspoCRM', websiteUrl: 'https://www.espocrm.com', githubHandle: 'espocrm', isVerified: true },
  { slug: 'salesagility', name: 'SuiteCRM (SalesAgility)', websiteUrl: 'https://suitecrm.com', githubHandle: 'salesagility', isVerified: true },
  { slug: 'monicahq', name: 'Monica', websiteUrl: 'https://www.monicahq.com', githubHandle: 'monicahq', isVerified: true },
  { slug: 'krayin', name: 'Krayin CRM', websiteUrl: 'https://krayincrm.com', githubHandle: 'krayin', isVerified: true },
  { slug: 'crater', name: 'Crater (invoicing)', websiteUrl: 'https://crater.primotly.com', githubHandle: 'crater-invoice', isVerified: true },
  { slug: 'yetiforce', name: 'YetiForce', websiteUrl: 'https://yetiforce.com', githubHandle: 'YetiForce', isVerified: true },
  { slug: 'zurmo', name: 'Zurmo', websiteUrl: 'http://zurmo.org', githubHandle: 'zurmo', isVerified: true },
  // communication
  { slug: 'element', name: 'Element (Matrix)', websiteUrl: 'https://element.io', githubHandle: 'element-hq', isVerified: true },
  { slug: 'jitsi', name: 'Jitsi', websiteUrl: 'https://jitsi.org', githubHandle: 'jitsi', isVerified: true },
  { slug: 'jami', name: 'Jami (SFLphone)', websiteUrl: 'https://jami.net', githubHandle: 'savoirfairelinux', isVerified: true },
  { slug: 'mumble', name: 'Mumble', websiteUrl: 'https://www.mumble.info', githubHandle: 'mumble-voip', isVerified: true },
  { slug: 'peertube', name: 'PeerTube (Framasoft)', websiteUrl: 'https://joinpeertube.org', githubHandle: 'Chocobozzz', isVerified: true },
  { slug: 'bigbluebutton', name: 'BigBlueButton', websiteUrl: 'https://bigbluebutton.org', githubHandle: 'bigbluebutton', isVerified: true },
  // project-management
  { slug: 'redmine', name: 'Redmine', websiteUrl: 'https://www.redmine.org', githubHandle: 'redmine', isVerified: true },
  { slug: 'taiga', name: 'Taiga', websiteUrl: 'https://www.taiga.io', githubHandle: 'taigaio', isVerified: true },
  { slug: 'focalboard', name: 'Focalboard', websiteUrl: 'https://www.focalboard.com', githubHandle: 'mattermost', isVerified: true },
  { slug: 'wekan', name: 'Wekan', websiteUrl: 'https://wekan.github.io', githubHandle: 'wekan', isVerified: true },
  { slug: 'leantime', name: 'Leantime', websiteUrl: 'https://leantime.io', githubHandle: 'Leantime', isVerified: true },
  { slug: 'kanboard', name: 'Kanboard', websiteUrl: 'https://kanboard.org', githubHandle: 'kanboard', isVerified: true },
  { slug: 'tuleap', name: 'Tuleap', websiteUrl: 'https://www.tuleap.org', githubHandle: 'Enalean', isVerified: true },
  // cms
  { slug: 'wordpress', name: 'WordPress Foundation', websiteUrl: 'https://wordpress.org', githubHandle: 'WordPress', isVerified: true },
  { slug: 'plone', name: 'Plone Foundation', websiteUrl: 'https://plone.org', githubHandle: 'plone', isVerified: true },
  { slug: 'keystonejs', name: 'KeystoneJS', websiteUrl: 'https://keystonejs.com', githubHandle: 'keystonejs', isVerified: true },
  { slug: 'tinacms', name: 'TinaCMS', websiteUrl: 'https://tina.io', githubHandle: 'tinacms', isVerified: true },
  { slug: 'decap', name: 'Decap CMS (formerly Netlify CMS)', websiteUrl: 'https://decapcms.org', githubHandle: 'decaporg', isVerified: true },
  // email
  { slug: 'postal', name: 'Postal (postalserver)', websiteUrl: 'https://postal.wiki', githubHandle: 'postalserver', isVerified: true },
  { slug: 'sendy', name: 'Sendy (Elastic)', websiteUrl: 'https://sendy.co', githubHandle: 'codex', isVerified: true },
  { slug: 'stalwart', name: 'Stalwart Mail', websiteUrl: 'https://stalw.art', githubHandle: 'stalwartlabs', isVerified: true },
  { slug: 'wildduck', name: 'WildDuck', websiteUrl: 'https://wildduck.email', githubHandle: 'nodemailer', isVerified: true },
  { slug: 'mailcow', name: 'Mailcow', websiteUrl: 'https://mailcow.email', githubHandle: 'mailcow', isVerified: true },
  { slug: 'iredmail', name: 'iRedMail', websiteUrl: 'https://www.iredmail.org', githubHandle: 'iredmail', isVerified: true },
  { slug: 'mailu', name: 'Mailu', websiteUrl: 'https://mailu.io', githubHandle: 'Mailu', isVerified: true },
  // auth
  { slug: 'ory', name: 'Ory', websiteUrl: 'https://www.ory.sh', githubHandle: 'ory', isVerified: true },
  { slug: 'authentik', name: 'Authentik', websiteUrl: 'https://goauthentik.io', githubHandle: 'goauthentik', isVerified: true },
  { slug: 'authelia', name: 'Authelia', websiteUrl: 'https://www.authelia.com', githubHandle: 'authelia', isVerified: true },
  { slug: 'casdoor', name: 'Casdoor', websiteUrl: 'https://casdoor.org', githubHandle: 'casdoor', isVerified: true },
  { slug: 'logto', name: 'Logto', websiteUrl: 'https://logto.io', githubHandle: 'logto-io', isVerified: true },
  { slug: 'supertokens', name: 'SuperTokens', websiteUrl: 'https://supertokens.com', githubHandle: 'supertokens', isVerified: true },
  { slug: 'zitadel', name: 'Zitadel', websiteUrl: 'https://zitadel.com', githubHandle: 'zitadel', isVerified: true },
  // search
  { slug: 'opensearch', name: 'OpenSearch (Linux Foundation)', websiteUrl: 'https://opensearch.org', githubHandle: 'opensearch-project', isVerified: true },
  { slug: 'zincsearch', name: 'ZincSearch', websiteUrl: 'https://zincsearch.com', githubHandle: 'zinclabs', isVerified: true },
  { slug: 'sonic', name: 'Sonic (valeriansaliou)', websiteUrl: 'https://github.com/valeriansaliou/sonic', githubHandle: 'valeriansaliou', isVerified: true },
  { slug: 'manticoresearch', name: 'Manticore Search', websiteUrl: 'https://manticoresearch.com', githubHandle: 'manticoresoftware', isVerified: true },
  { slug: 'apachesolr', name: 'Apache Solr', websiteUrl: 'https://solr.apache.org', githubHandle: 'apache', isVerified: true },
  { slug: 'vespa', name: 'Vespa', websiteUrl: 'https://vespa.ai', githubHandle: 'vespa-engine', isVerified: true },
  // storage
  { slug: 'minio', name: 'MinIO', websiteUrl: 'https://min.io', githubHandle: 'minio', isVerified: true },
  { slug: 'seafile', name: 'Seafile', websiteUrl: 'https://www.seafile.com', githubHandle: 'haiwen', isVerified: true },
  { slug: 'owncloud', name: 'ownCloud', websiteUrl: 'https://owncloud.com', githubHandle: 'owncloud', isVerified: true },
  { slug: 'filerun', name: 'FileRun', websiteUrl: 'https://www.filerun.com', githubHandle: 'afilerun', isVerified: true },
  { slug: 'pydio', name: 'Pydio Cells', websiteUrl: 'https://pydio.com', githubHandle: 'pydio', isVerified: true },
  { slug: 'syncthing', name: 'Syncthing', websiteUrl: 'https://syncthing.net', githubHandle: 'syncthing', isVerified: true },
  { slug: 'garagehq', name: 'Garage (Deuxfleurs)', websiteUrl: 'https://garagehq.deuxfleurs.fr', githubHandle: 'deuxfleurs', isVerified: true },
  // automation
  { slug: 'activepieces', name: 'Activepieces', websiteUrl: 'https://www.activepieces.com', githubHandle: 'activepieces', isVerified: true },
  { slug: 'windmill', name: 'Windmill', websiteUrl: 'https://www.windmill.dev', githubHandle: 'windmill-labs', isVerified: true },
  { slug: 'apache', name: 'Apache Foundation', websiteUrl: 'https://www.apache.org', githubHandle: 'apache', isVerified: true },
  { slug: 'temporalio', name: 'Temporal', websiteUrl: 'https://temporal.io', githubHandle: 'temporalio', isVerified: true },
  { slug: 'kestraio', name: 'Kestra', websiteUrl: 'https://kestra.io', githubHandle: 'kestra-io', isVerified: true },
  { slug: 'argoproj', name: 'Argo (Intuit)', websiteUrl: 'https://argoproj.github.io', githubHandle: 'argoproj', isVerified: true },
  // monitoring (new category)
  { slug: 'uptimekuma', name: 'Uptime Kuma', websiteUrl: 'https://github.com/louislam/uptime-kuma', githubHandle: 'louislam', isVerified: true },
  { slug: 'signoz', name: 'SigNoz', websiteUrl: 'https://signoz.io', githubHandle: 'SigNoz', isVerified: true },
  { slug: 'netdata', name: 'Netdata', websiteUrl: 'https://www.netdata.cloud', githubHandle: 'netdata', isVerified: true },
  // code hosting (new category)
  { slug: 'gitea', name: 'Gitea', websiteUrl: 'https://gitea.io', githubHandle: 'go-gitea', isVerified: true },
  { slug: 'forgejo', name: 'Forgejo', websiteUrl: 'https://forgejo.org', githubHandle: 'forgejo', isVerified: true },
  // BI (new category)
  { slug: 'metabase', name: 'Metabase', websiteUrl: 'https://www.metabase.com', githubHandle: 'metabase', isVerified: true },
  { slug: 'superset', name: 'Apache Superset', websiteUrl: 'https://superset.apache.org', githubHandle: 'apache', isVerified: true },
];

const havePub = new Set(publishers.map(p => p.slug));
let pubAdded = 0;
for (const p of NEW_PUBS) {
  if (!havePub.has(p.slug)) {
    publishers.push(p);
    havePub.add(p.slug);
    pubAdded++;
  }
}

// New categories
const NEW_CATS = [
  { slug: 'monitoring', name: 'Monitoring & Observability', description: 'Uptime checks, metrics, traces, log aggregation, and observability you can self-host.', icon: 'activity', displayOrder: 12 },
  { slug: 'code-hosting', name: 'Code Hosting & Review', description: 'Self-hosted Git platforms, code review, and CI for teams that want to own their source.', icon: 'git-branch', displayOrder: 13 },
  { slug: 'business-intelligence', name: 'Business Intelligence', description: 'SQL-first BI tools, dashboards, and analytics warehouses that connect to any data source.', icon: 'pie-chart', displayOrder: 14 },
];
const haveCat = new Set(categories.map(c => c.slug));
let catAdded = 0;
for (const c of NEW_CATS) {
  if (!haveCat.has(c.slug)) {
    categories.push(c);
    haveCat.add(c.slug);
    catAdded++;
  }
}

fs.writeFileSync(pubFile, JSON.stringify(publishers, null, 2) + '\n');
fs.writeFileSync(catFile, JSON.stringify(categories, null, 2) + '\n');
console.log(`Publishers: ${publishers.length} total, ${pubAdded} added.`);
console.log(`Categories: ${categories.length} total, ${catAdded} added.`);
