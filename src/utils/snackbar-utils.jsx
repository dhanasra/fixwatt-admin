import { SnackbarProvider, useSnackbar } from 'notistack';

let snackbarRef;

export const initSnackbarRef = (ref) => {
  snackbarRef = ref;
};

export const showSnackbar = (message, options) => {
  if (snackbarRef) {
    snackbarRef.enqueueSnackbar(message, options);
  } else {
    console.error("SnackbarProvider reference not initialized.");
  }
};

export const SnackbarContainer = () => {
  return <SnackbarProvider ref={initSnackbarRef}/>;
};

export const useSnackbarUtils = () => {
  return useSnackbar();
};
