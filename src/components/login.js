import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('https://mock-server-lxrw.onrender.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
  
      const user = userData.find((user) => user.username === username && user.password === password);
  
      if (user) {
        alert('Login successful!');
        sessionStorage.setItem("user","true")
        navigate('/allappointments');
      } else {
        throw new Error('Login failed: Invalid username or password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to login. Please try again.');
    }
  };
  

  return (
    <Container maxW="md">
      <Box mt={8} p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
        <form onSubmit={handleSubmit}>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4} id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button mt={4} colorScheme="teal" type="submit">
            Login As Admin
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
