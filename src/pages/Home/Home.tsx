/** @jsxImportSource theme-ui */
import React from 'react';
import { cardInfoData } from '../../data/HomeData';
import {
  Wrapper,
  Container,
  TextContainer,
  Header,
  Button,
  CardContainer,
  Card,
  ContainerContentCard,
  Title,
  Amount,
  InfoCard,
  InfoCardContainer,
  Image,
  CardHeader,
  CardInfo,
} from './HomeStyles';

const Home = () => {
  return (
    <Wrapper>
      <Container>
        <TextContainer>
          <Header sx={{ color:'sky'}} >Leveraged yield farming, on Celo.</Header>
          <Button sx={{
            variant: 'buttons.major',
          }} to='/earn'>Launch App</Button>
        </TextContainer>
        <CardContainer>
          <Card>
            <ContainerContentCard>
              <Title>Total Value Locked</Title>
              <Amount>53,282,049 USD</Amount>
            </ContainerContentCard>
          </Card>
        </CardContainer>
      </Container>
      <Container>
        {cardInfoData.map((item, index) => {
          return (
            <InfoCard key={index}>
              <InfoCardContainer>
                <div>
                  <Image src={item.icon} alt={item.title} />
                </div>
                <div>
                  <CardHeader>{item.title}</CardHeader>
                  <CardInfo>{item.apy}</CardInfo>
                </div>
              </InfoCardContainer>
            </InfoCard>
          );
        })}
      </Container>
    </Wrapper>
  );
};

export default Home;
