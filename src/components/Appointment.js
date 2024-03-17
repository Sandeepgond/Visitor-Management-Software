import React, { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, Heading } from '@chakra-ui/react';
import { ThreeDots } from 'react-loader-spinner';

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    passNo: '',
    visitDate: '',
    visitorName: '',
    numOfVisitors: 1,
    contactNumber: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.visitDate || !formData.visitorName || !formData.contactNumber) {
      alert('Please fill in all required fields.');
      setLoading(false);
      return;
    }
    if (formData.numOfVisitors < 1) {
      alert('Number of visitors must be at least 1.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://mock-server-lxrw.onrender.com/existedAppointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit appointment');
      }
      setFormData({
        visitDate: '',
        visitorName: '',
        numOfVisitors: 1,
        contactNumber: '',
      });

      alert('Appointment submitted successfully!');
    } catch (error) {
      console.error('Error submitting appointment:', error.message);
      alert('Failed to submit appointment. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="container.md" mt={8}>
      <Heading as="h2" size="lg" mb={4}>
        Appointment Form
      </Heading>
      <Box borderWidth="1px" borderRadius="lg" p={6}>
        <form onSubmit={handleSubmit}>
          <FormControl id="visitDate" mb={4}>
            <FormLabel>Visit Date</FormLabel>
            <Input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              min={new Date().toISOString().split('T')[0]}
              required
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="visitorName" mb={4}>
            <FormLabel>Visitor Name</FormLabel>
            <Input
              type="text"
              name="visitorName"
              value={formData.visitorName}
              required
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="numOfVisitors" mb={4}>
            <FormLabel>Number of Visitors</FormLabel>
            <Input
              type="number"
              name="numOfVisitors"
              value={formData.numOfVisitors}
              min={1}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="contactNumber" mb={4}>
            <FormLabel>Contact Number</FormLabel>
            <Input
              type="number"
              name="contactNumber"
              value={formData.contactNumber}
              required
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" disabled={loading}>
            {loading ? <ThreeDots color="#FFFFFF" height={24} width={24} /> : 'Submit'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AppointmentPage;
