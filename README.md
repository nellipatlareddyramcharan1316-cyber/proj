# Agile Development Process and DevOps
## Lab Exercise: Kubernetes Implemented Through Jenkins (All 15 Sets)

This repository contains the complete implementation, Jenkinsfiles, Kubernetes manifests, container definitions, and documentation for all 15 lab sets of the **Kubernetes Implemented Through Jenkins** curriculum.

---

## 📋 Table of All 15 Lab Sets

| Set | Lab Exercise Title | Directory | Key Concepts |
| :---: | :--- | :--- | :--- |
| **Set 1** | Configure Jenkins to connect to a Kubernetes cluster and verify connection | [`sets/set-01-verify-connection`](sets/set-01-verify-connection) | `kubeconfig`, cluster-info, node listing |
| **Set 2** | Create a Jenkins Pipeline to deploy a sample application to Kubernetes | [`sets/set-02-deploy-sample-app`](sets/set-02-deploy-sample-app) | Declarative pipeline, kubectl apply |
| **Set 3** | Implement a Jenkins Pipeline to create a Kubernetes Pod using a YAML file | [`sets/set-03-create-pod-yaml`](sets/set-03-create-pod-yaml) | Pod specification, YAML manifests |
| **Set 4** | Use Jenkins to deploy a web application to Kubernetes using a Deployment | [`sets/set-04-deploy-web-deployment`](sets/set-04-deploy-web-deployment) | Deployment controller, replica tracking |
| **Set 5** | Configure Jenkins to expose a Kubernetes application using a Service | [`sets/set-05-expose-service`](sets/set-05-expose-service) | NodePort / ClusterIP services |
| **Set 6** | Implement a Jenkins Pipeline to scale a Kubernetes Deployment to three replicas | [`sets/set-06-scale-deployment`](sets/set-06-scale-deployment) | `kubectl scale`, dynamic replica monitoring |
| **Set 7** | Use Jenkins to update a Kubernetes Deployment with a new Docker image | [`sets/set-07-update-image`](sets/set-07-update-image) | `kubectl set image`, image rollout |
| **Set 8** | Configure a Jenkins Pipeline to deploy an application using a Kubernetes ConfigMap | [`sets/set-08-configmap`](sets/set-08-configmap) | ConfigMap env injection & volume mounts |
| **Set 9** | Use Jenkins to create a Kubernetes PersistentVolumeClaim and mount it inside a Pod | [`sets/set-09-pvc-mount`](sets/set-09-pvc-mount) | PVC, persistent volume storage, disk mount |
| **Set 10** | Implement a Jenkins Pipeline to configure a readiness probe for a Kubernetes application | [`sets/set-10-readiness-probe`](sets/set-10-readiness-probe) | Readiness probes, healthchecks, conditions |
| **Set 11** | Integrate GitHub with Jenkins to automatically deploy code changes to Kubernetes | [`sets/set-11-github-integration`](sets/set-11-github-integration) | GitHub Webhooks, SCM polling, Git triggers |
| **Set 12** | Create a Jenkins CI/CD Pipeline to build a Docker image and deploy it to Kubernetes | [`sets/set-12-docker-k8s-cicd`](sets/set-12-docker-k8s-cicd) | Docker build, tag versioning, deployment |
| **Set 13** | Configure Jenkins to perform rolling updates and verify the rollout status | [`sets/set-13-rolling-update`](sets/set-13-rolling-update) | RollingUpdate strategy, zero-downtime, rollout history |
| **Set 14** | Implement a Jenkins Pipeline to detect and troubleshoot Kubernetes deployment failures | [`sets/set-14-troubleshoot-failure`](sets/set-14-troubleshoot-failure) | Failure detection, pod diagnostics, self-healing |
| **Set 15** | Implement a complete CI/CD pipeline using GitHub, Jenkins, Docker, and Kubernetes | [`sets/set-15-complete-cicd-pipeline`](sets/set-15-complete-cicd-pipeline) | End-to-end CI/CD: build, test, package, deploy, verify |

---

## 🚀 Quick Start: Jenkins Credential Configuration

1. In your Kubernetes environment (Minikube / Docker Desktop / Cloud cluster):
   - Locate your `kubeconfig` file (`~/.kube/config` on Linux or `C:\Users\<user>\.kube\config` on Windows).
2. In Jenkins Dashboard:
   - Navigate to **Manage Jenkins** &rarr; **Credentials** &rarr; **System** &rarr; **Global credentials**.
   - Click **Add Credentials**:
     - **Kind**: `Secret file`
     - **File**: Upload your `kubeconfig` file.
     - **ID**: `k8s-kubeconfig`
     - **Description**: `Kubernetes Cluster Kubeconfig`
   - Click **Create**.
3. All Jenkinsfiles in this repository use the `k8s-kubeconfig` credential ID out-of-the-box.

---

## 🔗 GitHub Repository Integration

This repository is configured to sync with:
`https://github.com/nellipatlareddyramcharan1316-cyber/proj.git`
