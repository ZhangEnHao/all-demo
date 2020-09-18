import React from "react";
import { RegisterNode } from "gg-editor";
import circularConfig from "./circularConfig";
import rectConfig from "./rectConfig";
import rhombusConfig from "./rhombusConfig";
import capsuleConfig from "./capsuleConfig";

export * from './CustomNode';

/*******    开始事件    *******/ 
// 开始节点
export const StartEvent = () => <RegisterNode name="start-event" config={circularConfig} extend={"flow-circle"} />
// 定时节点
export const TimerEvent = () => <RegisterNode name="timer-event" config={circularConfig} extend={"flow-circle"} />
// 消息节点
export const MessageEvent = () => <RegisterNode name="message-event" config={circularConfig} extend={"flow-circle"} />
// 信号节点
export const SignalEvent = () => <RegisterNode name="signal-event" config={circularConfig} extend={"flow-circle"} />

/*******    活动    *******/ 
// 审批节点
export const UserTask = () => <RegisterNode name="user-task" config={rectConfig} extend={"flow-rect"} />
// 脚本节点
export const ScriptTask = () => <RegisterNode name="script-task" config={rectConfig} extend={"flow-rect"} />
// 邮件节点
export const MailTask = () => <RegisterNode name="mail-task" config={rectConfig} extend={"flow-rect"} />
// 接收节点
export const ReceiveTask = () => <RegisterNode name="receive-task" config={rectConfig} extend={"flow-rect"} />

/*******    网关    *******/ 
// 排他网关
export const ExclusiveGateway = () => <RegisterNode name="exclusive-gateway" config={rhombusConfig} extend={"flow-rhombus"} />
// 并行网关
export const ParallelGateway = () => <RegisterNode name="parallel-gateway" config={rhombusConfig} extend={"flow-rhombus"} />
// 包容网关
export const InclusiveGateway = () => <RegisterNode name="inclusive-gateway" config={rhombusConfig} extend={"flow-rhombus"} />

/*******    捕获事件    *******/
// 定时节点
export const TimerCatch = () => <RegisterNode name="timer-catch" config={rhombusConfig} extend={"flow-rhombus"} />
// 消息节点
export const MessageCatch = () => <RegisterNode name="message-catch" config={rhombusConfig} extend={"flow-rhombus"} />
// 信号节点
export const SignalCatch = () => <RegisterNode name="signal-catch" config={rhombusConfig} extend={"flow-rhombus"} />

/*******    结束事件    *******/
// 结束节点
export const EndEvent = () => <RegisterNode name="end-event" config={circularConfig} extend={"flow-circle"} />

/*******    定制节点    *******/
export const CustomizeItem = () => <RegisterNode name="customize-item" config={rectConfig} extend={"flow-rect"} />
