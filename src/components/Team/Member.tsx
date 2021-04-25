import { User } from "@type/team.type";
import { Button, Row, Col } from "react-bootstrap";
import React from "react";


const Member = ({
  member,
  role = "member",
}: {
  member?: User;
  role: string;
}) => {
  if (member) {
    return (
      <Col sm={6}>
        <Button
          variant={role === "Team Lead" ? "primary" : ""}
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
              <Row className="d-flex align justify-content-between">
                <span>
                  {member.firstName} {member.lastName}
                </span>
                <span className="pr-3"> {role}</span>
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
