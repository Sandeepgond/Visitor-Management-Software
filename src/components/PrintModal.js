import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text,
    ModalCloseButton,
    useDisclosure,
    Button,
    Flex,
    Image,
    Box,
    Center,
} from '@chakra-ui/react';
import ReactToPrint from 'react-to-print';
import "./PrintModal.css"

const PrintModal = ({ id, appointment }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userdata, setuserdata] = useState(null);
    const componentRef = React.useRef();

    useEffect(() => {
        const userd = appointment.find((el) => el.id === id);
        setuserdata(userd);
    }, [appointment, id]);

    return (
        <>
            <Button colorScheme="blue" onClick={onOpen}>Print</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className="modal-content">
                    <ModalHeader textAlign="center" borderBottomWidth="1px">Print Visitor Card</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {userdata && (
                            <div ref={componentRef} style={{ padding: '20px' ,height:"auto",border:"1px solid"}} >
                                <Box backgroundColor="#5072A7" borderRadius={"10px"}>
                                    <Box paddingTop={"10px"} margin={'auto'}>
                                        <Flex className='text-center' backgroundColor="white" p={4}>
                                            <Center>
                                            <Image w={"20%"} src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQXEqS8QR5R6GahGSeJT5qgRy1sX2_smEteqpxospaOgABeYvWj"/>
                                            <Text ml={5}  color="#5072A7">AMNEVH Group</Text></Center>
                                        </Flex>
                                    </Box>
                                    <Center><Text fontSize='3xl' color="white" p={5} letterSpacing={2}>VISITOR</Text></Center>
                                    <Box w={"95%"} m={"auto"} backgroundColor={'white'}>
                                     <Flex mb={5}>
                                        <Image w={100} h={50} src="https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"/>
                                        <Box pl={5}>
                                            <Text fontSize="lg" >Pass No : {userdata.id}</Text>
                                            <Text fontSize="lg" >Visit Date : {userdata.visitDate}</Text>
                                            <Text fontSize="lg" >Visitor Name : {userdata.visitorName}</Text>
                                            <Text fontSize="lg" >Number of Visitors : {userdata.numOfVisitors}</Text>
                                            <Text fontSize="lg" >Contact No. : {userdata.contactNumber}</Text>
                                            <Text>Approved by : ....................</Text>
                                            <Text>Gate Stamp : ....................</Text>
                                        </Box>
                                     </Flex>
                                    </Box>
                                <Center><Text width={"80%"} mb={5} color={'white'} >Sai City Udaypura, Farrukhabad Road, Nh-92, Etawah - (U.P.)</Text></Center>
                                </Box>
                            </div>
                        )}
                    </ModalBody>

                    <ModalFooter justifyContent="center">
                        <ReactToPrint
                            trigger={() => (
                                <Button colorScheme="blue" mr={3}>
                                    Print
                                </Button>
                            )}
                            content={() => componentRef.current}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default PrintModal;