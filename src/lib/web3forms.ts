/** Envoi d'un formulaire via Web3Forms (le site est statique, sans backend). */
export async function submitWeb3Forms(fields: Record<string, FormDataEntryValue | string | null>) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) throw new Error("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY manquante");

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: accessKey, ...fields })
  });
  const result = (await response.json()) as { success?: boolean };
  if (!response.ok || !result.success) throw new Error("Échec de l'envoi Web3Forms");
}
