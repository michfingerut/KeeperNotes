import { LogButton, LogInContainer, LogInH1 } from '../styles/styles';

function ErrorComp(props) {
  ///////////////////// props /////////////////////
  const { setIsLogged } = props;
  /////////////////////////////////////////////////

  function handleRefresh() {
    window.location.reload();
  }

  const message = 'Oops... something went wrong';
  return (
    <LogInContainer>
      <div>
        <LogInH1>{message}</LogInH1>
      </div>
      <div>
        <LogButton onClick={handleRefresh}>Refresh</LogButton>
        <LogButton
          onClick={() => {
            setIsLogged(false);
          }}
          color="inherit"
        >
          Logout
        </LogButton>
      </div>
    </LogInContainer>
  );
}

export default ErrorComp;
