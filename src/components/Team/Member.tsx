import { Team, User } from "@type/team.type";
import { Link, useLocation } from "react-router-dom";
import { Button, Card, Col, ListGroup, Media, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { FiChevronsDown, FiChevronsUp } from "react-icons/fi";
import styled from "styled-components/macro";
import useTeamDetail from "@hooks/useTeamDetail.hook";
import Spinner from "@components/Spinner/Spinner";
import useTeamPreview from "@hooks/useTeamPreview.hook";

interface Props {
  children?: React.ReactNode;
  teamId: string;
  memberIds: string[];
}

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
