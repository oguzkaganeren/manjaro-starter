import { FC, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useTranslation } from 'react-i18next';
import { Button, Modal } from 'react-daisyui';
import { MdClose } from 'react-icons/md';
import AboutComponent from './AboutComponent';
import LanguageComponent from './LanguageComponent';
import StartLaunch from './StartLaunch';
import ThemeSelectComponent from './ThemeSelectComponent';

const AppSettings: FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState<boolean>(false);
  const toggleVisible = () => {
    setVisible(!visible);
  };
  return (
    <>
      <Button
        size="sm"
        shape="square"
        onClick={toggleVisible}
        startIcon={<GiHamburgerMenu />}
        className="z-[998]"
      />
      <Modal open={visible} onClickBackdrop={toggleVisible}>
        <Button
          size="sm"
          shape="square"
          className="absolute right-2 top-2"
          onClick={toggleVisible}
          startIcon={<MdClose />}
        />
        <Modal.Header>{t('appSettings')}</Modal.Header>
        <Modal.Body>
          <ThemeSelectComponent />
          <LanguageComponent />
          <StartLaunch />
          <AboutComponent />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AppSettings;
