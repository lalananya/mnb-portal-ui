import { Suspense, lazy } from "react"
import { Route, BrowserRouter, Routes } from "react-router-dom"

const TaskPage = lazy(()=> import("../screens/task-page/index"))
export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/task-list" element={<TaskPage/>}></Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}