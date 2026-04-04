# Define absolute paths for Antigravity resources
$antigravityRoot = "C:\Users\honey\.gemini\antigravity"
$skillsPath = "$antigravityRoot\skills"
$agentsPath = "$antigravityRoot\.agents"
$pluginsPath = "$antigravityRoot\plugins"

# Set individual environment variables (User scope)
[Environment]::SetEnvironmentVariable("ANTIGRAVITY_ROOT", $antigravityRoot, [EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("ANTIGRAVITY_SKILLS_PATH", $skillsPath, [EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("ANTIGRAVITY_AGENTS_PATH", $agentsPath, [EnvironmentVariableTarget]::User)
[Environment]::SetEnvironmentVariable("ANTIGRAVITY_PLUGINS_PATH", $pluginsPath, [EnvironmentVariableTarget]::User)

# Fetch current User PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", [EnvironmentVariableTarget]::User)

# List of paths to ensure are in the PATH
$pathsToInsert = @($skillsPath, $agentsPath, $pluginsPath)

foreach ($p in $pathsToInsert) {
    if ($currentPath -and $currentPath -notlike "*$p*") {
        # Ensure we have a separator
        if (-not $currentPath.EndsWith(";")) {
            $currentPath += ";"
        }
        $currentPath += $p
        Write-Host "Adding $p to User PATH..."
    } elseif (-not $currentPath) {
        $currentPath = $p
        Write-Host "Initializing User PATH with $p..."
    } else {
        Write-Host "$p is already in User PATH."
    }
}

# Update the PATH permanently
[Environment]::SetEnvironmentVariable("Path", $currentPath, [EnvironmentVariableTarget]::User)

Write-Host "Successfully exported Antigravity global resources to Environment Variables."
