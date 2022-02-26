import {
  Box,
  Button,
  IconButton,
  useToast,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import React from 'react';
import _ from 'lodash';
import { RiInstallLine, RiCheckLine } from 'react-icons/ri';
import {
  useRecoilCallback,
} from 'recoil';
import { packageState, installPackage, getPackageStatus } from '../../stores/PackageStore';

interface PackageInfoProps {
    isInstalled:boolean,
    catId:string,
    pkId:string,
    pkgName:string,
  }
  interface ModalProps {
    dsc:JSX.Element[],
  }
const PackageInfo: React.FC<PackageInfoProps> = (props) => {
  const toast = useToast();
  const packageStatusUpdate = useRecoilCallback(({ snapshot, set }) => async (
    catId:string,
    pkId:string,
  ) => {
    const packages = await snapshot.getPromise(packageState);
    const cats = _.cloneDeep(packages);
    const catIndex = cats.findIndex((element) => element.id === catId);
    const pkIndex = cats[catIndex].packages.findIndex((element) => element.id === pkId);
    const updatedPk = cats[catIndex].packages[pkIndex];
    const packageStatus = await snapshot.getPromise(getPackageStatus(updatedPk.pkg));
    updatedPk.isInstalled = packageStatus === 'true';
    set(packageState, (prev) => prev.map((item, index) => {
      if (index !== catIndex) {
        return item;
      }
      return {
        ...item,
        packages: item.packages.map((pk, index2) => (pkIndex !== index2 ? pk : updatedPk)),
      };
    }));
  }, []);
  const BasicUsage : React.FunctionComponent<ModalProps> = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <Box>
        <Button onClick={onOpen} size="sm" mt={5} colorScheme="whatsapp" variant="solid">Details</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {props.dsc}
            </ModalBody>

          </ModalContent>
        </Modal>
      </Box>
    );
  };
  const installPackageWithName = useRecoilCallback(({ snapshot }) => async (
    catId:string,
    pkId:string,
    pkgName:string,
  ) => {
    const result:string = await snapshot.getPromise(installPackage(pkgName));

    const desc = result.replaceAll('"', '').replaceAll('\\u{a0}', ' ').split('\\n').map((item, index) => (
      <span>
        {item}
        <br />
      </span>
    ));
    const colDesc = (
      <>
        <Text noOfLines={[1, 2, 3]}>
          {desc}
        </Text>
        <BasicUsage dsc={desc} />
      </>
    );
    packageStatusUpdate(catId, pkId);
    if (result.toUpperCase().includes('ERROR')) {
      toast({
        title: `Installing ${pkgName}`,
        description: desc,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    } else {
      toast({
        title: `Installing ${pkgName}`,
        description: colDesc,
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  });
  const {
    isInstalled, catId, pkId, pkgName,
  } = props;
  return (
    <div>
      {isInstalled ? (
        <IconButton aria-label="installed" disabled icon={<RiCheckLine />} colorScheme="gray" variant="solid" />
      ) : (
        <IconButton aria-label="install" icon={<RiInstallLine />} onClick={() => installPackageWithName(catId, pkId, pkgName)} colorScheme="green" variant="solid" />
      )}
    </div>
  );
};
export default PackageInfo;
