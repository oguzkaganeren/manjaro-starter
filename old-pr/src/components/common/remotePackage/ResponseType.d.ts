interface Meta {
        html_url: string;
        sha: string;
    }
export interface RemotePackageResponseType {
        filename: string;
        name: string;
        base: string;
        version: string;
        desc: string;
        csize: string;
        isize: string;
        md5sum: string;
        sha256sum: string;
        pgpsig: string;
        url: string;
        license: string;
        arch: string;
        builddate: string;
        packager: string;
        depends: string[];
        optdepends: string[];
        makedepends: string[];
        tokens: string[];
        meta: Meta;
    }
