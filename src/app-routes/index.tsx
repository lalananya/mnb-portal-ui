import { Suspense, lazy } from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"

const TaskPage = lazy(()=> import("../screens/task-page/index"))
const ImagePage = lazy(()=> import("../screens/image-page/index"))
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/task-list" element={<TaskPage/>}></Route>
                    <Route path="/image-list" element={<ImagePage/>}></Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}