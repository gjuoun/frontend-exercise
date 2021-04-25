import { User } from "@type/team.type";
import { Button, Row, Col } from "react-bootstrap";
import React from "react";
import { GrLocation, GrUser, GrUserManager } from "react-icons/gr";

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
              <img
                width={32}
                height={32}
                className="mr-3 rounded-circle"
                src={member?.avatarUrl ?? ""}
                alt="avatar"
              />
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
