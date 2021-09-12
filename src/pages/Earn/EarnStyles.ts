import styled from '@emotion/styled';

export const Item = styled.div`
  width: 100%;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr repeat(5, 0.9fr) 1.6fr;

  grid-template-rows: 1fr;
  height: 75px;
  border-bottom: 1px solid #72828a15;
  color: var(--white);
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
    h2 {
      font-size: 12px;
      color: var(--white);
      font-weight: 400;
    }
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
    &:first-of-type {
      margin-right: 0.5rem;
    }
  }
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

export const CardContainer = styled.article`
  margin: 1rem 0 5rem 0;
  min-height: 40vh;
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
`;
