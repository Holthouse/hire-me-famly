import { Child } from "../_interfaces/child";

const API_BASE_URL = "https://app.famly.co/api/v2/children";
const accessToken = "1127a03c-ed76-41d5-9058-f9ca105c41cf";

export const fetchChildren = async (): Promise<Child[]> => {
  console.log("Fetching children...");

  const url = new URL("https://app.famly.co/api/daycare/tablet/group");
  url.searchParams.append("accessToken", accessToken);
  url.searchParams.append("groupId", "86413ecf-01a1-44da-ba73-1aeda212a196");
  url.searchParams.append(
    "institutionId",
    "dc4bd858-9e9c-4df7-9386-0d91e42280eb"
  );

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching children: ${response.statusText}`);
  }

  const data = await response.json();
  console.log("Fetched children response:", data);

  return data.children;
};

export const checkInChild = async (childId: string): Promise<void> => {
  console.log(`Checking in child with ID: ${childId}`);

  const now = new Date();
  const pickupTime = `${now.getHours() + 4}:${now.getMinutes()}`;

  const response = await fetch(`${API_BASE_URL}/${childId}/checkins`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
      pickupTime,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error checking in child: ${response.statusText}`);
  }

  console.log(`Child with ID: ${childId} has been checked in.`);
};

export const checkOutChild = async (childId: string): Promise<void> => {
  console.log(`Checking out child with ID: ${childId}`);

  const response = await fetch(`${API_BASE_URL}/${childId}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error checking out child: ${response.statusText}`);
  }

  console.log(`Child with ID: ${childId} has been checked out.`);
};
