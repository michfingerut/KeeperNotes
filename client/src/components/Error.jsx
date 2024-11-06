import { LogButton, LogInContainer, LogInH1 } from '../styles/styles';

function ErrorComp() {
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
      </div>
    </LogInContainer>
  );
}

export default ErrorComp;
