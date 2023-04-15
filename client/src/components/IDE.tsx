import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { gruvboxDark } from "@uiw/codemirror-theme-gruvbox-dark";
import { useState } from "react";
import { executeCode, getCodeStatus } from "../services/UserFunctions";

const languages = {
  cpp: cpp(),
  java: java(),
  javascript: javascript(),
  python: python(),
};

interface IEvaluationResponse {
  requestStatus?: {
    message?: string;
    code?: string;
  };
  requestId?: string;
  context?: string;
  errors?: {
    quota?: number;
    current_count?: number;
  };
  result: {
    run_status: {
      memory_used?: string;
      status?: string;
      time_used?: string;
      signal?: string;
      exit_code?: string;
      status_detail?: string;
      stderr?: string;
      output: string;
      request_NOT_OK_reason?: string;
      request_OK?: string;
    };
    compile_status: string;
  };
}

const IDE = () => {
  const [execution, setExecution] = useState({
    language: "javascript",
    code: "",
    compileOutput: "",
    runOutput: "",
    parameters: "",
  });

  const compileCode = (method: string) => {
    const requestPayload = {
      language: "",
      code: execution.code,
      parameters: execution.parameters,
    };

    switch (execution.language) {
      case "cpp": {
        requestPayload.language = "CPP14";
        break;
      }
      case "java": {
        requestPayload.language = "JAVA";
        break;
      }
      case "javascript": {
        requestPayload.language = "JAVASCRIPT";
        break;
      }
      case "python": {
        requestPayload.language = "PYTHON3";
        break;
      }
      default: {
        break;
      }
    }

    executeCode(requestPayload)
      .then((response: { message: string; requestId: string }) => {
        setTimeout(() => {
          getCodeStatus(response.requestId)
            .then((endResponse: IEvaluationResponse) => {
              if (method === "compile") {
                setExecution({
                  ...execution,
                  compileOutput: endResponse.result.compile_status,
                });
              } else {
                setExecution({
                  ...execution,
                  runOutput: endResponse.result.run_status.output,
                });
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container-fluid">
      <br />
      <div className="row">
        <div className="col-md-12">
          <h3 className="text-left">Live Code Compiler</h3>
          <div className="dropdown">
            <select
              value={execution.language}
              onChange={(event) =>
                setExecution({
                  ...execution,
                  language: event.target.value,
                })
              }>
              <option value="cpp" className="dropdown-item">
                C++
              </option>
              <option value="java" className="dropdown-item">
                Java
              </option>
              <option value="javascript" className="dropdown-item">
                JavaScript
              </option>
              <option value="python" className="dropdown-item">
                Python
              </option>
            </select>
          </div>
        </div>
        <div className="col-md-12">
          <br />
          <CodeMirror
            value={execution.code}
            height="500px"
            theme={gruvboxDark}
            extensions={[languages[execution.language as keyof typeof languages]]}
            placeholder="<h1>Hello there!</h1>"
            onChange={(value) =>
              setExecution({
                ...execution,
                code: value,
              })
            }
          />
        </div>
      </div>
      <br />
      <br />
      <div className="row">
        <div className="col-md-4 ">
          <div className="card">
            <h5 className="card-header">Input</h5>
            <div className="card-body">
              <textarea
                className="form-control"
                rows={3}
                onChange={(event) =>
                  setExecution({
                    ...execution,
                    parameters: event.target.value,
                  })
                }></textarea>
            </div>
            <div className="card-footer">Type any input that needs to be given to program</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <h5 className="card-header">Compile Output</h5>
            <div className="card-body">
              <p className="card-text">{execution.compileOutput}</p>
            </div>
          </div>
          <button type="button" className="btn btn-outline-primary btn-block mt-5 mx-auto" onClick={() => compileCode("compile")}>
            Compile Code
          </button>
        </div>
        <div className="col-md-4 ">
          <div className="card">
            <h5 className="card-header">Run Output</h5>
            <div className="card-body">
              <p className="card-text">{execution.runOutput}</p>
            </div>
          </div>
          <button type="button" className="btn btn-block btn-outline-success mt-5 mx-auto" onClick={() => compileCode("run")}>
            Run Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default IDE;
