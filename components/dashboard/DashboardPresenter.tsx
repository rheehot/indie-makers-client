import React from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "../../typed-components";
import Wrapper from "../wrapper";
import Input from "../input";
import Form from "../form";
import Select from "../select";
import GoalText from "../goalText";
import Section from "../section";
import Title from "../title";
import Button from "../button";
import routes from "../../routes";
import SmallDetailCard from "../smallDetailCard";
import { getDashboard } from "../../types/api";
import { Consumer } from "../../lib/context";

const Container = styled.div`
  margin: 50px 0px;
  padding: 10vh 0px;
  @media (max-width: 1000px) {
    margin-bottom: 0px;
    padding-bottom: 0px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr minmax(340px, 1fr);
  grid-gap: 50px;
  & > *:last-child {
    margin-top: 87px;
  }
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-gap: 25px;
    & > *:last-child {
      margin-top: 10px;
    }
  }
`;

const Column = styled.div``;

const HTitle = styled.h2`
  font-weight: 600;
  font-size: 38px;
`;

const Subtitle = styled.h3`
  font-size: 28px;
  margin-top: 10px;
  margin-bottom: 50px;
`;

const List = styled.div`
  background-color: white;
  ${props => props.theme.cardShadow};
  padding: 20px 40px;
  border-radius: ${props => props.theme.borderRadius};
`;

const AddContainer = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  grid-gap: 20px;
  margin-bottom: 30px;
  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

const Products = styled.div`
  display: grid;
  grid-gap: 30px;
`;

const Product = styled.option`
  color: ${props => props.theme.blackColor};
`;

const EGoalText = styled(GoalText)`
  margin-bottom: 15px;
`;

const Goals = styled.div``;

const FLink = styled.span`
  color: ${props => props.theme.greyColor};
  text-decoration: underline;
  margin-left: 10px;
`;

const AddLink = styled.span`
  color: ${props => props.theme.blackColor};
  font-weight: 600;
  text-decoration: underline;
`;

interface IProps {
  inputValue: string;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  productId: number;
  loading: boolean;
  data?: getDashboard;
  handleSubmit: () => void;
}

const getTime = () => {
  const today = new Date();
  const currentHour = today.getHours();
  let time = "";
  if (currentHour < 12) {
    time = "morning";
  } else if (currentHour < 18) {
    time = "afternoon";
  } else {
    time = "evening";
  }
  return time;
};

const DashboardPresenter: React.SFC<IProps> = ({
  inputValue,
  handleInputChange,
  productId,
  data,
  handleSubmit
}) => (
  <Container>
    <Head>
      <title>Dashboard | Indie Makers</title>
    </Head>
    <Wrapper>
      <Grid>
        <Column>
          <HTitle>
            Good {getTime()}{" "}
            {data && data.Me && data.Me.user && data.Me.user.firstName}!
          </HTitle>
          <Subtitle>What are you gonna accomplish today?</Subtitle>
          <List>
            {data &&
            data.GetLatestProducts &&
            data.GetLatestProducts.products &&
            data.GetLatestProducts.products.length > 0 ? (
              <Form onSubmit={handleSubmit}>
                <AddContainer>
                  <Input
                    fontSize={"22px"}
                    type={"text"}
                    value={inputValue}
                    name={"newToDo"}
                    onChange={handleInputChange}
                    placeholder={"Type a goal and press 'Enter'"}
                  />
                  <Select
                    name={"productId"}
                    value={String(productId)}
                    onChange={handleInputChange}
                  >
                    <Product value={"none"}>Add to</Product>
                    {data &&
                      data.GetAllProducts &&
                      data.GetAllProducts.products &&
                      data.GetAllProducts.products.map(
                        product =>
                          product && (
                            <Product value={product.id} key={product.id}>
                              {product.name}
                            </Product>
                          )
                      )}
                  </Select>
                </AddContainer>
              </Form>
            ) : (
              <span>
                To add a 'To Do' you first need to{" "}
                <Link prefetch href={routes.addProduct} key={2}>
                  <a>
                    <AddLink>create a product</AddLink>
                  </a>
                </Link>
              </span>
            )}

            <Goals>
              {data &&
                data.GetLatestGoals &&
                data.GetLatestGoals.goals &&
                data.GetLatestGoals.goals.map(
                  goal =>
                    goal && (
                      <EGoalText
                        key={goal.id}
                        isMine={true}
                        fontSize={"18px"}
                        productName={(goal.product && goal.product.name) || ""}
                        text={goal.text}
                        timeStamp={goal.createdAt}
                        goalId={goal.id}
                        isCompleted={goal.isCompleted}
                        productSlug={(goal.product && goal.product.slug) || ""}
                      />
                    )
                )}
            </Goals>
          </List>
        </Column>
        <Consumer>
          {({ userQuery }) => (
            <Section
              titleElements={[
                <Title key={1}>Your products </Title>,
                <Link prefetch href={routes.addProduct} key={2}>
                  <a>
                    <Button size={"xs"} text={"Add one"} />
                  </a>
                </Link>,
                <Link
                  prefetch
                  href={routes.userDetail(
                    (userQuery &&
                      userQuery.Me &&
                      userQuery.Me.user &&
                      userQuery.Me.user.username) ||
                      ""
                  )}
                  as={routes.asUserDetail(
                    (userQuery &&
                      userQuery.Me &&
                      userQuery.Me.user &&
                      userQuery.Me.user.username) ||
                      ""
                  )}
                  key={3}
                >
                  <a>
                    <FLink>See all</FLink>
                  </a>
                </Link>
              ]}
            >
              <Products>
                {data &&
                data.GetLatestProducts &&
                data.GetLatestProducts.products &&
                data.GetLatestProducts.products.length > 0 ? (
                  data.GetLatestProducts.products.map(
                    product =>
                      product && (
                        <SmallDetailCard
                          key={product.id}
                          icon={product.logo || undefined}
                          title={product.name}
                          subtitle={product.description}
                          isLink={true}
                          link={routes.productDetail(product.slug)}
                          linkAs={routes.asProductDetail(product.slug)}
                          isCard={true}
                          lightSubtitle={false}
                          toDoNumber={`${product.completedGoalCount}/${
                            product.goalCount
                          }`}
                        />
                      )
                  )
                ) : (
                  <span>
                    No products here 😭.{" "}
                    <Link prefetch href={routes.addProduct}>
                      <a>
                        <AddLink>Add one now</AddLink>
                      </a>
                    </Link>
                  </span>
                )}
              </Products>
            </Section>
          )}
        </Consumer>
      </Grid>
    </Wrapper>
  </Container>
);

export default DashboardPresenter;
