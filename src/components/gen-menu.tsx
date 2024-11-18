import type { IMenu } from "@/models";
import NotFound from "@/pages/not-found/not-found";
import { Navigate, Route, Routes } from "react-router-dom";

interface IProps {
  path: Partial<IMenu>[];
}
function GenMenuByArray(props: IProps) {
  const { path } = props;
  const ItemRoute = (item: Partial<IMenu>) => {
    const { element, children, path, to } = item;
    return to ? (
      <Route element={<Navigate to={to} />} key={path}>
        { Array.isArray(children) && ListRoute(children)}
      </Route>
    ) : (
      <Route element={element} path={path} key={path}>
        { Array.isArray(children) && ListRoute(children)}
      </Route>
    );
  };

  const ListRoute = (list: Partial<IMenu>[]) => {
    return list?.map((item) => ItemRoute(item));
  };
  return (
    <Routes>
      {ListRoute(path)}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default GenMenuByArray;
