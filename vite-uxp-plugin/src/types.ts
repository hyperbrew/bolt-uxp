export type UXP_COMMAND = {
  type: string;
  id: string;
  label: {
    default: string;
  };
};
export type UXP_PANEL = {
  type: string;
  id: string;
  label: {
    default: string;
  };
  minimumSize?: {
    width: number;
    height: number;
  };
  maximumSize?: {
    width: number;
    height: number;
  };
  preferredDockedSize?: {
    width: number;
    height: number;
  };
  preferredFloatingSize?: {
    width: number;
    height: number;
  };
  icons?: {
    width: number;
    height: number;
    path: string;
    scale: number[];
    theme: string[];
    species: string[];
  }[];
};

export type UXP_Manifest = {
  id: string;
  name: string;
  version: string;
  main: string;
  manifestVersion: number;
  host: {
    app: string;
    minVersion: string;
    data?: {
      apiVersion?: number;
    };
  }[];
  entrypoints: Array<UXP_PANEL | UXP_Manifest>;
  requiredPermissions?: {
    localFileSystem?: string;
    launchProcess?: {
      schemes?: string[];
      extensions?: string[];
    };
    network?: {
      domains?: string[];
    };
    clipboard?: string;
    webview?: {
      allow?: string;
      domains?: string[];
    };
    enableAddon?: boolean;
  };
  addon?: {
    name?: string;
  };
  icons?: {
    width?: number;
    height?: number;
    path?: string;
    scale?: number[];
    theme?: string[];
    species?: string[];
  }[];
};

export type UXP_Config = {
  manifest: UXP_Manifest;
  hotReloadPort: number;
  copyZipAssets: string[];
};
