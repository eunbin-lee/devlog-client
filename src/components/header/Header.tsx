import React, { useCallback, useState } from 'react';
import devlog from '../../../static/devlog.png';
import logo from '../../../static/logo.png';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import theme from '../../styles/theme';
import Button from '../common/Button';
import HeaderSearch from './HeaderSearch';
import AuthModal from '../auth/AuthModal';

function Header() {
  const router = useRouter();
  const { route, asPath } = router;

  const onClickHome = () => {
    router.push('/');
  };
  const [visible, setVisible] = useState(false);
  const [authMode, setAuthMode] = useState('');
  const onShowModal = useCallback(
    (mode: string) => {
      setAuthMode(mode);
      setVisible(true);
    },
    [visible],
  );
  const onToggleMode = useCallback(() => {
    if (authMode === 'LOGIN') {
      setAuthMode('REGISTER');
    } else {
      setAuthMode('LOGIN');
    }
  }, [authMode]);
  const onCloseModal = useCallback(() => {
    setVisible(false);
  }, [visible]);

  return (
    <Container className={route !== '/' && 'shadowing'}>
      <Inner>
        <LogoBlock>
          {route.includes('username') ? (
            <UserBlock>
              <img src={logo} alt="Devlog logo" onClick={onClickHome} />
              <Username>{asPath.slice(2)}</Username>
            </UserBlock>
          ) : (
            <img src={devlog} alt="Devlog logo" onClick={onClickHome} />
          )}
        </LogoBlock>
        <Gnb>
          <HeaderSearch />
          <Login onClick={() => onShowModal('LOGIN')}>Log in</Login>
          <Button
            border={true}
            onClick={() => onShowModal('REGISTER')}
            style={{ padding: '1rem', borderRadius: '1.25rem' }}
          >
            Get started
          </Button>
        </Gnb>
        <AuthModal
          visible={visible}
          mode={authMode}
          onSwitch={onToggleMode}
          onClose={() => onCloseModal()}
        />
      </Inner>
    </Container>
  );
}

export default Header;

const Container = styled.header`
  &.shadowing {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.08);
  }
`;
const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1024px;
  margin: 0 auto;
  padding: 1.25rem 0;

  ${theme.media.large} {
    width: 100%;
    padding: 1.25rem 1rem;
  }
  ${theme.media.xsmall} {
    width: 320px;
  }
`;
const LogoBlock = styled.div``;
const UserBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Username = styled.span`
  margin-left: 0.25rem;
  font-size: ${theme.fontSizes.xlarge};
  font-weight: bold;
  color: ${theme.palette.gray8};
`;
const Gnb = styled.div`
  display: flex;
  align-items: center;
`;
const Login = styled.button`
  margin: 0 1.25rem;
  font-size: ${theme.fontSizes.default};
  color: ${theme.palette.violet1};
`;
