import { User } from "@type/team.type";
import { Button, Row, Col } from "react-bootstrap";
import React, {Suspense} from "react";
import { GrLocation, GrUser, GrUserManager } from "react-icons/gr";

const Avatar = React.lazy(() => import("./Avatar"));

const Member = ({
  member,
  role = "member",
}: {
  member?: User;
  role?: string;
}) => {
  const renderRole = (role: string) => {
    if (role === "Member") {
      return (
        <>
          <GrUser /> {role}
        </>
      );
    } else {
      return (
        <>
          <GrUserManager /> {role}
        </>
      );
    }
  };

  const renderLocation = (location: string) => {
    return (
      <>
        <GrLocation /> {location}
      </>
    );
  };

  if (member) {
    return (
      <Col sm={6}>
        <Button
          variant={role === "Team Lead" ? "outline-primary" : "outline-dark"}
          className="w-100 my-1"
        >
          <Row className="d-flex align-items-center ">
            <Col sm={2}>
              <Suspense fallback={<></>}>
                <Avatar src={member.avatarUrl} />
              </Suspense>
            </Col>
            <Col>
              <Row className="d-flex  align justify-content-between">
                {member.firstName} {member.lastName}
                <span className="pr-3">
                  <span className="pr-3">
                    {renderLocation(member.location)}
                  </span>
                  <span>{renderRole(role)}</span>
                </span>
              </Row>
            </Col>
          </Row>
        </Button>
      </Col>
    );
  } else {
    return <>This member is not available.</>;
  }
};

export default Member;
