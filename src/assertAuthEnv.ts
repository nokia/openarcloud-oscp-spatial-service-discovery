export function authRequiredFromEnv(): boolean {
  return ["1", "true", "yes", "on"].includes(
    (process.env.AUTH_REQUIRED || "true").toLowerCase()
  );
}

export function assertAuthEnvIfRequired(): void {
  if (!authRequiredFromEnv()) {
    return;
  }

  const missing: string[] = [];
  for (const name of ["AUTH0_ISSUER", "AUTH0_AUDIENCE"]) {
    const value = process.env[name];
    if (value === undefined || value.trim() === "") {
      missing.push(name);
    }
  }

  if (missing.length > 0) {
    console.error(
      `AUTH_REQUIRED is enabled but required Auth0 environment variable(s) are missing: ${missing.join(
        ", "
      )}. Set them in .env or set AUTH_REQUIRED=false for local/dev only.`
    );
    process.exit(1);
  }
}
