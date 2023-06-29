import styled from 'styled-components/native';

export const UploadPhotoStyle = styled.Pressable`
  width: 80px;
  height: 80px;
  background: ${props => props.theme.colors.accent};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 300px;
`;

export const UploadPhotoText = styled.Text`
  font-family: 'Arial';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 2px;
  color: #ffffff;
`;
