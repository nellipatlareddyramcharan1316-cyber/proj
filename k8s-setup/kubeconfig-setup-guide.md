# Jenkins to Kubernetes Connection Setup Guide

To execute these lab sets, Jenkins needs credentials and `kubectl` permissions to communicate with your Kubernetes cluster (Minikube, Docker Desktop K8s, MicroK8s, or Cloud EKS/GKE/AKS).

---

## Prerequisites
1. **Kubernetes Cluster Running**:
   - Verify locally:
     ```bash
     kubectl cluster-info
     kubectl get nodes
     ```
2. **Jenkins Server Running**:
   - Jenkins installed on Host, in Docker, or on Kubernetes.
3. **Required Jenkins Plugins**:
   - **Pipeline** (Workflow plugin)
   - **Kubernetes CLI Plugin** (`kubernetes-cli`) - *Recommended*
   - **Credentials Plugin** & **Plain Credentials Plugin**
   - **Git Plugin** (for Sets 11, 12, 15)
   - **Docker Pipeline Plugin** (for Sets 12, 15)

---

## Method 1: Connecting via `kubeconfig` (Easiest for Minikube / Docker Desktop)

### Step 1: Prepare the Kubeconfig file
- Locate your kubeconfig file:
  - Windows: `C:\Users\<username>\.kube\config`
  - Linux/Mac: `~/.kube/config`
- If Jenkins runs inside a Docker container, ensure the cluster server address in `config` is reachable:
  - If using Docker Desktop / Minikube, change `127.0.0.1` or `localhost` to `host.docker.internal` so Jenkins container can route to the host cluster.

### Step 2: Add Kubeconfig to Jenkins Credentials
1. Open Jenkins Dashboard -> **Manage Jenkins** -> **Credentials** -> **System** -> **Global credentials**.
2. Click **Add Credentials**:
   - **Kind**: `Secret file`
   - **File**: Upload your `.kube/config` file.
   - **ID**: `k8s-kubeconfig`  *(Used across all Jenkinsfiles in this lab)*
   - **Description**: `Kubernetes Cluster Kubeconfig`
3. Click **Create**.

---

## Method 2: Connecting via ServiceAccount Token (Production/Cluster-native approach)

### Step 1: Apply the RBAC manifest
```bash
kubectl apply -f k8s-setup/jenkins-rbac.yaml
```

### Step 2: Extract the Token and API Server URL
```bash
# Get API Server URL
kubectl cluster-info

# Get Token (Kubernetes 1.24+)
kubectl get secret jenkins-robot-token -n default -o jsonpath="{.data.token}" | base64 --decode
```

### Step 3: Add to Jenkins Credentials
1. In Jenkins -> **Manage Jenkins** -> **Credentials** -> **Add Credentials**:
   - **Kind**: `Secret text`
   - **Secret**: Paste the decoded token
   - **ID**: `k8s-token`
2. In Jenkins Pipeline, supply cluster API URL and `k8s-token`.

---

## How Pipelines in this Lab Use the Credentials

We use Jenkins' built-in `configFileProvider` or `withKubeConfig` from the **Kubernetes CLI Plugin**:
```groovy
withKubeConfig([credentialsId: 'k8s-kubeconfig']) {
    sh 'kubectl get nodes'
}
```
Or fallback standard credential file binding:
```groovy
withCredentials([file(credentialsId: 'k8s-kubeconfig', variable: 'KUBECONFIG')]) {
    sh 'kubectl get nodes'
}
```
*Both syntaxes are compatible, guaranteeing seamless execution.*
