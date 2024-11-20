import { getClients, getClientStatuses } from "./services/api.service.js";
import { updateGoogleSheet } from "./services/google-sheets.service.js";

async function main() {
  const clients = await getClients();
  const userIds = clients.map((client) => client.id);
  const statusesWithId = await getClientStatuses(userIds);

  const clientsWithStatuses = clients.map((client) => ({
    ...client,
    status: statusesWithId[client.id],
  }));
  console.log('\x1b[32m%s\x1b[0m',`${clientsWithStatuses.length} clients received.`)
  await updateGoogleSheet(clientsWithStatuses);
}

main().catch(console.error);
