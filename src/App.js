import React from 'react';
import {
  ChakraProvider,
  Text,
  theme,
  Flex,
  Button,
  Image,
  Center,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import groundLogo from './assets/ground.png';
import tempLogo from './assets/temp.png';
import lightLogo from './assets/light.png';

const getRandomInt = (min, max) => {
  let randomInt = Math.random() * (max - min) + min;
  return Math.floor(randomInt);
};

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [light, setLight] = useState({});
  const [ground, setGround] = useState({});
  const [temp, setTemp] = useState({});

  const [lightValue, setLightValue] = useState();
  const [groundValue, setGroundValue] = useState();
  const [tempValue, setTempValue] = useState();

  const [isActive, setIsActive] = useState(false);

  const handleStart = () => {
    onClose();
    setIsActive(true);
  };

  const getBgColor = (bordersState, currentValue) => {
    if (
      bordersState.max === undefined ||
      bordersState.min === undefined ||
      !isActive
    ) {
      return 'gray.100';
    }

    if (
      Number(bordersState.min) <= currentValue &&
      Number(bordersState.max) >= currentValue
    ) {
      return 'green.100';
    }

    return 'red.100';
  };

  const getValue = value => {
    if (isActive) {
      return value;
    }
    return 'неизвестно';
  };

  useEffect(() => {
    if (!isActive) {
      return;
    }
    const interval = setInterval(() => {
      const randomLightValue = getRandomInt(0, 100);
      const randomGroundValue = getRandomInt(0, 100);
      const randomTempValue = getRandomInt(0, 100);

      setLightValue(randomLightValue);
      setGroundValue(randomGroundValue);
      setTempValue(randomTempValue);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <ChakraProvider theme={theme}>
      <Center h={'100vh'}>
        <Flex direction={'column'} align="center" maxW={'1000px'} w={'100%'}>
          <Flex justify={'space-between'} w={'100%'}>
            <Flex
              direction={'column'}
              align="center"
              gap={2}
              bgColor={getBgColor(light, lightValue)}
              p={6}
              borderRadius={'md'}
            >
              <Box w={100} h={100}>
                <Image src={lightLogo} alt="ground" />
              </Box>
              <Flex gap={2}>
                <Text>Освещенность: </Text>
                <Text minW={5} fontWeight={'semibold'}>
                  {getValue(lightValue)}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction={'column'}
              align="center"
              gap={2}
              bgColor={getBgColor(ground, groundValue)}
              p={6}
              borderRadius={'md'}
            >
              <Box w={100} h={100}>
                <Image src={groundLogo} alt="ground" />
              </Box>
              <Flex gap={2} justify="center">
                <Text>Влажность почвы: </Text>
                <Text minW={5} fontWeight={'semibold'}>
                  {getValue(groundValue)}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction={'column'}
              align="center"
              gap={2}
              bgColor={getBgColor(temp, tempValue)}
              p={6}
              borderRadius={'md'}
            >
              <Box w={100} h={100}>
                <Image src={tempLogo} alt="ground" />
              </Box>
              <Flex gap={2}>
                <Text>Температура: </Text>
                <Text minW={5} fontWeight={'semibold'}>
                  {getValue(tempValue)}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex mt={100}>
            {isActive ? (
              <Button onClick={() => setIsActive(false)}>
                Прекратить работу
              </Button>
            ) : (
              <Button onClick={onOpen}>Подготовить к запуску</Button>
            )}
          </Flex>
        </Flex>
      </Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Граничные значения</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Box>
                <Text>Освещенность:</Text>
                <Flex gap={4} mt={2}>
                  <NumberInput max={light.max}>
                    <NumberInputField
                      placeholder={'Минимум'}
                      onChange={e =>
                        setLight({ ...light, min: e.target.value })
                      }
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <NumberInput>
                    <NumberInputField
                      placeholder={'Максимум'}
                      onChange={e =>
                        setLight({ ...light, max: e.target.value })
                      }
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </Box>
              <Box>
                <Text>Влажность почвы:</Text>
                <Flex gap={4} mt={2}>
                  <NumberInput max={ground.max}>
                    <NumberInputField
                      placeholder={'Минимум'}
                      onChange={e =>
                        setGround({ ...ground, min: e.target.value })
                      }
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <NumberInput>
                    <NumberInputField
                      placeholder={'Максимум'}
                      onChange={e =>
                        setGround({ ...ground, max: e.target.value })
                      }
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </Box>
              <Box>
                <Text>Температура:</Text>
                <Flex gap={4} mt={2}>
                  <NumberInput max={temp.max}>
                    <NumberInputField
                      placeholder={'Минимум'}
                      onChange={e => setTemp({ ...temp, min: e.target.value })}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <NumberInput>
                    <NumberInputField
                      placeholder={'Максимум'}
                      onChange={e => setTemp({ ...temp, max: e.target.value })}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Flex>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleStart}>
              Запуск
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default App;
