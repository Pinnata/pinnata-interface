import styled from '@emotion/styled';

export const Item = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1.2fr repeat(2, 0.8fr) 1.2fr 1fr repeat(2, 0.7fr);
  grid-template-rows: 1fr;
  height: 75px;
  border-bottom: 1px solid #72828a15;
  .left {
    margin-left: 1rem;
  }
  .image {
    height: 40px;
    margin-right: 0.5rem;
  }
  h2,
  h3 {
    margin: 0;
    padding: 0;
  }
  .flexFirst {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .flex {
    display: flex;
    align-items: center;
    img {
      margin-right: 0.5rem;
    }
    h3 {
      font-size: 12px;
      color: var(--fourth-color);
      font-weight: 400;
    }
    h2 {
      font-size: 12px;
      color: var(--white);
      font-weight: 400;
    }
  }
  .block {
    display: block;
    h3 {
      color: var(--fourth-color);
      font-size: 12px;
      margin-bottom: 0.3rem;
      font-weight: 400;
    }
    h2 {
      font-size: 16px;
      font-weight: 400;
      color: var(--white);
    }
  }
  .center {
    text-align: center;
  }
  .centerMiddle {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .thin {
    color: var(--white);
    font-size: 16px;
    font-weight: 400;
  }
  .large {
    font-weight: 600;
    font-size: 24px;
    color: var(--white);
  }
  .end {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  a {
    box-shadow: 0px 0px 12px rgba(128, 255, 219, 0.36);
    border-radius: 5px;
    padding: 12px 25px;
    background: var(--main-color);
    color: #000;
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
  }
  .height {
    height: 75px;
  }
  .flexColumn {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    h3 {
      color: var(--fourth-color);
      font-size: 12px;
      margin-bottom: 0.3rem;
      font-weight: 400;
      margin-right: 0.5rem;
    }
    h2 {
      font-size: 16px;
      font-weight: 400;
      color: var(--white);
    }
  }
  .margin {
    margin-bottom: 0.5rem;
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const Wrapper = styled.section`
  width: 85vw;
  margin: 0 auto;
  min-height: 80vh;
  position: relative;
  @media screen and (max-width: 1000px) {
    width: 90vw;
  }
`;

export const Background = styled.img`
  position: absolute;
  bottom: -30%;
  left: 10%;
  width: 80%;
  height: auto;
  pointer-events: none;
`;

export const Container = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 3rem 0;
  @media screen and (max-width: 1000px) {
    margin: 2rem 0;
  }
`;

export const Title = styled.h1`
  color: var(--main-color);
  font-size: 48px;
  font-weight: bold;
  padding: 0;
  margin: 0;
  @media screen and (max-width: 1000px) {
    font-size: 42px;
  }
`;

export const Description = styled.h3`
  display: flex;
  align-items: center;
  color: var(--white);
  font-weight: 400;
  padding: 0;
  font-size: 24px;
  margin: 0;
  margin-top: 1rem;
  span {
    background: var(--white);
    width: 68px;
    height: 25px;
    border-radius: 15px;
    color: var(--black);
    font-size: 24px;
    font-weight: 400;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
`;

export const CardContainer = styled.article`
  margin: 1rem 0 10rem 0;
  min-height: 80vh;
`;

export const SecondTitle = styled.h2`
  font-size: 28px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  margin-bottom: 2rem;
  color: var(--white);
`;

export const Flex = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-top: 3rem;
  .active {
    background: var(--main-color);
    box-shadow: 0px 0px 12px rgba(128, 255, 219, 0.36);
  }
`;

export const Button = styled.button`
  width: 260px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--second-color);
  color: var(--black);
  font-size: 16px;
  font-weight: 700;
  border-radius: 5px 5px 0px 0px;
  box-shadow: 0px -4px 20px rgba(255, 255, 255, 0.15);
  border: none;
  outline: none;
  cursor: pointer;
  &:first-of-type {
    margin-right: 0.5rem;
  }
  &:last-of-type {
    margin-left: 0.5rem;
  }
`;

export const InfoContainer = styled.div`
  width: 80vw;
  background: var(--third-color);
  height: 55vh;
  border-radius: 0px 5px 5px 5px;
  box-shadow: 0px 0px 12px rgba(128, 255, 219, 0.36);
  position: relative;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-track {
    /* background: #80ffdb15; wrong code*/
  }
  &::-webkit-scrollbar-thumb {
    background: var(--main-color);
    border-radius: 50px;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1.2fr repeat(2, 0.8fr) 1.2fr 1fr repeat(2, 0.7fr);
  grid-template-rows: 1fr;
  height: 55px;
  border-bottom: 1px solid #72828a15;
  margin: 0;
  padding: 0;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  left: 0;
  background: var(--third-color);

  @media screen and (max-width: 1000px) {
    display: none;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    height: 100%;
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    color: var(--fourth-color);
    margin: 0;
    padding: 0;
  }
`;
