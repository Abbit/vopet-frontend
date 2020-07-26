import styled from "styled-components";

export enum AvatarSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

interface AvatarProps {
  avatarSize?: AvatarSize;
}

const smallSize = "2.5rem";
const mediumSize = "3rem";
const largeSize = "4rem";

const Avatar = styled.div<AvatarProps>`
  background: gray;
  border-radius: 999px;

  height: ${({ avatarSize }) => {
    switch (avatarSize) {
      case AvatarSize.Small:
        return smallSize;
      case AvatarSize.Medium:
        return mediumSize;
      case AvatarSize.Large:
        return largeSize;
    }
  }};

  width: ${({ avatarSize }) => {
    switch (avatarSize) {
      case AvatarSize.Small:
        return smallSize;
      case AvatarSize.Medium:
        return mediumSize;
      case AvatarSize.Large:
        return largeSize;
    }
  }};
`;

Avatar.defaultProps = {
  avatarSize: AvatarSize.Medium,
};

export default Avatar;
