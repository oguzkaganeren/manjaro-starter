import { invoke } from '@tauri-apps/api/core';
import React, { useEffect } from 'react';

export default function usePkIconHook(icon:string) {
  const [iconSrc, setIconSrc] = React.useState('');
  useEffect(() => {
    invoke('get_svg_icon', {
      svgpath: `/usr/share/icons/Papirus/32x32/apps/${icon}.svg`,
    }).then((response) => {
      if (response) {
        setIconSrc(response as string);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return iconSrc;
}
