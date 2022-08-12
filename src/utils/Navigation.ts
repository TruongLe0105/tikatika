import { CommonActions, StackActions, DrawerActions, Route } from '@react-navigation/native';

let _navigator: any;

const reset = (routes: Omit<Route<string>, 'key'>[]) => {
  _navigator.dispatch(
    CommonActions.reset({
      routes: routes,
    })
  );
};

function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
}


function navigate(
  name: string,
  params?: object,
  key?: string
): any {
  _navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
      key
    })
  );
}

function replace(name: string, params?: object | undefined) {
  _navigator.dispatch(
    StackActions.replace(name, params)
  );
}

function push(
  name: string,
  params?: object,
) {
  _navigator.dispatch(
    StackActions.push(name, params)
  );
}

function openDrawer() {
  _navigator.dispatch(DrawerActions.openDrawer());
}

function goBack() {
  _navigator.dispatch(CommonActions.goBack());
}

function pop(n = 1) {
  _navigator.dispatch(StackActions.pop(n));
}

function popToTop() {
  _navigator.dispatch(StackActions.popToTop())
}

// add other navigation functions that you need and export them

export const Navigation = {
  navigate,
  setTopLevelNavigator,
  push,
  openDrawer,
  goBack,
  reset,
  pop,
  popToTop,
  replace,
};
