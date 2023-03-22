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
export interface PackageDetailMenuProps {
  pkg: string;
  isInstalled: boolean;
  installedVersion: string;
  catId: string;
  pkId:string;
}
