import React, { useState, useEffect } from 'react';
import { Container, Heading,Button, Table, Thead, Tbody, Tr, Th, Td, Image } from '@chakra-ui/react';
import {TailSpin} from 'react-loader-spinner';
import PrintModal from './PrintModal';

const SeeAllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mock-server-lxrw.onrender.com/existedAppointment');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user"); 
    window.location.reload();
  };

  return (
    <Container maxW="container.lg" mt={8}>
      <Heading as="h2" size="xl" mb={4}>
        All Appointments
      </Heading>
      <Button onClick={handleLogout} marginLeft={"90%"}>Logout</Button> <br/>  <br/>
      {loading ? ( 
        <TailSpin color="#00BFFF" height={80} width={80} />
      ) : (
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Visit Date</Th>
              <Th>Visitor Name</Th>
              <Th>No. of Visitors</Th>
              <Th>Contact Number</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointments.map((appointment, index) => (
              <Tr key={index}>
                <Td>
                  <Image
                    w="50px"
                    borderRadius="50%"
                    src="https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
                  />
                </Td>
                <Td>{appointment.visitDate}</Td>
                <Td>{appointment.visitorName}</Td>
                <Td>{appointment.numOfVisitors}</Td>
                <Td>{appointment.contactNumber}</Td>
                <Td>
                  <PrintModal
                    id={appointment.id}
                    appointment={appointments}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Container>
  );
};

export default SeeAllAppointments;
