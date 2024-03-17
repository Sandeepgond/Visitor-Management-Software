import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Flex, Box, Heading, Container} from '@chakra-ui/react';
import Home from './Home';
import Appointment from './Appointment';
import Login from './login';
import SeeAllAppointments from './SeeAllAppointments';
import PrivateRoute from './PrivateRoute';

const Navbar = () => {
  return (
    <>
      <Flex as="nav" align="center" justify="space-between" bg="teal" color="white" p={4}>
        <Heading as="h1" size="md">
          Visitor Management Software
        </Heading>
        <Box w="50%" display="flex" justifyContent="space-between">
          <Link as={Link} to="/" mr={4}>
            Home
          </Link>
          <Link as={Link} to="/appointment" mr={4}>
            Appointment
          </Link>
          <Link as={Link} to="/allappointments">
            All Appointments
          </Link>
        </Box>
      </Flex>
      <Container maxW="container.lg" mt={8}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/allappointments" element={<PrivateRoute Component={SeeAllAppointments} />} />
      </Routes>
      </Container>
    </>
  );
};

export default Navbar;
