import React from "react";
import Link from "next/link";
import styled from "../../typed-components";
import Badge from "../badge";
import RoundImage from "../roundImage";

const Span = styled.span``;

const Container = styled.div`
  border-radius: ${props => props.theme.borderRadius};
  padding: 20px;
  ${props => props.theme.cardShadow};
  background-color: white;
  cursor: pointer;
  width: 100%;
  & ${Span} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Icon = styled(RoundImage)`
  height: 80px;
  display: block;
  margin-bottom: 15px;
`;

const Title = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Pitch = styled.p``;

const Badges = styled.div`
  width: 100%;
  display: flex;
`;

const Footer = styled.footer`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Maker = styled(RoundImage)`
  height: 30px;
  width: 30px;
  border: 0;
`;

interface IPresenterProps {
  icon: string;
  title: string;
  subtitle: string;
  showSubtitle: boolean;
  hasAuthor: boolean;
  authorAvatar?: string;
  streakNumber?: number;
  launchedNumber?: number;
  toDoNumber?: string;
  needsHelp?: boolean;
  authorUsername?: string;
  isFinished?: boolean;
}

const CardContent: React.SFC<IPresenterProps> = ({
  icon,
  title,
  subtitle,
  showSubtitle,
  hasAuthor,
  authorAvatar,
  needsHelp,
  streakNumber,
  toDoNumber,
  launchedNumber,
  isFinished
}) => (
  <React.Fragment>
    <Icon src={icon} />
    <Title>{title}</Title>
    {showSubtitle && <Pitch>{subtitle}</Pitch>}
    <Footer>
      <Badges>
        <React.Fragment>
          {!isFinished &&
            toDoNumber !== undefined && <Badge text={toDoNumber} icon={"✅"} />}
          {isFinished && <Badge text={"Finished"} icon={"🚀"} />}
          {!isFinished &&
            needsHelp && <Badge text={"Need Help!"} icon={"⚠️"} />}
        </React.Fragment>
        <React.Fragment>
          {streakNumber !== undefined && (
            <Badge
              bgColor={"#FEF48B"}
              text={streakNumber}
              icon={"🔥"}
              title={"Daily Streak"}
            />
          )}
          {launchedNumber !== undefined && (
            <Badge
              bgColor={"#DBE9F1"}
              text={launchedNumber}
              icon={"🚀"}
              title={"Products Finished"}
            />
          )}
        </React.Fragment>
      </Badges>
      {hasAuthor && <Maker src={authorAvatar!} />}
    </Footer>
  </React.Fragment>
);

interface IContainerProps {
  isLink: boolean;
  link?: string;
  linkAs?: string;
}

const BigDetailCardContainer: React.SFC<IContainerProps & IPresenterProps> = ({
  isLink,
  link,
  linkAs,
  ...rest
}) => {
  if (!isLink) {
    return (
      <Container>
        <Span>
          <CardContent {...rest} />
        </Span>
      </Container>
    );
  } else {
    return (
      <Container>
        <Link href={link} as={linkAs}>
          <a>
            <Span>
              <CardContent {...rest} />
            </Span>
          </a>
        </Link>
      </Container>
    );
  }
};

export default BigDetailCardContainer;
