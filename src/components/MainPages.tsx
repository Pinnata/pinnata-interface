import styled from "@emotion/styled";

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
  @media screen and (max-width: 1000px) {
    font-size: 18px;
  }
`;

export const Wrapper = styled.section`
  width: 85%;
  margin: 0 auto;
  height: 100%;
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

export const CardContainer = styled.article`
  height: 100%;
`;

export const InfoContainer = styled.div`
  width: 80%;
  background: var(--third-color);
  height: 100%;
  border-radius: 5px 5px 5px 5px;
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
  grid-template-columns: 1fr repeat(5, 0.9fr) 1.6fr;
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