export interface PackageDetailProps {
    icon:string;
    title:string;
    catId:string;
    uniqueId:string;
    pkg:string;
    isInstalled:boolean;
    installedVersion:string;
    children: React.ReactNode;
  }
