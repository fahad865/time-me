import { Alert } from 'antd';
import * as React from 'react';
import { AppError } from '../../types';

export interface Props {
  error: AppError;
  errorReset: () => void;
}

class ErrorAlert extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { error } = this.props;
    return (
      <div style={{ margin: '5px' }}>
        {
          error.errorMessage ?
            <Alert
              type="error"
              banner={false}
              closable={true}
              showIcon={true}
              afterClose={this.props.errorReset}
              message={error.errorMessage}
            />
            : null
        }
      </div>
    );
  }
}

export default ErrorAlert;