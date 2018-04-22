import ErrorAlert from '../../components/common/ErrorAlert';
import { StoreState, AppError } from '../../types';
import { connect, Dispatch } from 'react-redux';
import * as actions from '../../actions/errorActions';

export type StateFromProps = {
  error: AppError;
};

export type DispatchFromProps = {
  errorReset: () => void;
};

export function mapStateToProps({ error }: StoreState) {
  return {
    error
  };
}

export const mapDispatchToProps = (dispatch: Dispatch<AppError>): DispatchFromProps => ({
  errorReset: () => dispatch(actions.errorReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorAlert);